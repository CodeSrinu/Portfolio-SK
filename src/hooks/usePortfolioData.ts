import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PortfolioData } from '../types';
import { defaultPortfolioData } from '../data/defaultData';

const PORTFOLIO_DOC = 'portfolio';
const SETTINGS_COLLECTION = 'settings';

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const docRef = doc(db, SETTINGS_COLLECTION, PORTFOLIO_DOC);

        // Fetch data once and merge with defaults to ensure new fields are present
        const fetchData = async () => {
            try {
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const firebaseData = snapshot.data() as Partial<PortfolioData>;
                    // Merge with defaults to ensure new fields like collaboration exist
                    setData({
                        ...defaultPortfolioData,
                        ...firebaseData,
                        // Ensure nested objects are properly merged
                        collaboration: firebaseData.collaboration || defaultPortfolioData.collaboration,
                        customSections: firebaseData.customSections || defaultPortfolioData.customSections || []
                    });
                } else {
                    setData(defaultPortfolioData);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching portfolio data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
                setData(defaultPortfolioData);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateData = async (newData: Partial<PortfolioData>) => {
        try {
            const docRef = doc(db, SETTINGS_COLLECTION, PORTFOLIO_DOC);
            const updatedData = { ...data, ...newData };
            await setDoc(docRef, updatedData);
            setData(updatedData as PortfolioData);
            return true;
        } catch (err) {
            console.error('Error updating portfolio data:', err);
            setError(err instanceof Error ? err.message : 'Failed to update data');
            return false;
        }
    };

    const initializeData = async () => {
        try {
            const docRef = doc(db, SETTINGS_COLLECTION, PORTFOLIO_DOC);
            // Always merge with defaults to add any new fields
            const snapshot = await getDoc(docRef);
            const existingData = snapshot.exists() ? snapshot.data() as Partial<PortfolioData> : {};

            const mergedData: PortfolioData = {
                ...defaultPortfolioData,
                ...existingData,
                // Ensure new fields are always included
                collaboration: existingData.collaboration || defaultPortfolioData.collaboration,
                customSections: existingData.customSections || defaultPortfolioData.customSections || []
            };

            await setDoc(docRef, mergedData);
            setData(mergedData);
            return true;
        } catch (err) {
            console.error('Error initializing portfolio data:', err);
            return false;
        }
    };

    return { data, loading, error, updateData, initializeData };
}
