import Particles from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadAll } from '@tsparticles/all';

const ParticleBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  // Initialize the particle engine
  useEffect(() => {
    const initParticles = async () => {
      await loadAll(tsParticles);
      setInit(true);
    };
    initParticles();
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ['#00cccc', '#00aaff'],
          },
          links: {
            color: '#00cccc',
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800, // Changed 'valueArea' to 'value_area'
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleBackground;