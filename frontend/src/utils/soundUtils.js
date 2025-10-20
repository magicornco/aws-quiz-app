// Mario-style sound effects using Web Audio API
export const playGameStartSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Mario-style power-up sound
    const createTone = (frequency, duration, startTime, type = 'sine') => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = type;
      
      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
      
      return oscillator;
    };
    
    const now = audioContext.currentTime;
    
    // Mario power-up melody: C-E-G-C (ascending)
    createTone(261.63, 0.2, now);      // C4
    createTone(329.63, 0.2, now + 0.1); // E4
    createTone(392.00, 0.2, now + 0.2); // G4
    createTone(523.25, 0.4, now + 0.3); // C5
    
    // Add a little sparkle at the end
    createTone(659.25, 0.1, now + 0.7); // E5
    createTone(783.99, 0.1, now + 0.8); // G5
    
  } catch (error) {
    console.log('Audio not supported or blocked by browser');
  }
};

export const playCorrectAnswerSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const createTone = (frequency, duration, startTime) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    
    // Quick ascending notes for correct answer
    createTone(440, 0.1, now);      // A4
    createTone(554.37, 0.1, now + 0.1); // C#5
    createTone(659.25, 0.2, now + 0.2); // E5
    
  } catch (error) {
    console.log('Audio not supported or blocked by browser');
  }
};

export const playWrongAnswerSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const createTone = (frequency, duration, startTime) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    
    // Descending notes for wrong answer
    createTone(220, 0.3, now);      // A3
    createTone(196, 0.3, now + 0.1); // G3
    
  } catch (error) {
    console.log('Audio not supported or blocked by browser');
  }
};

export const playTimeUpSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const createTone = (frequency, duration, startTime) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'triangle';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    
    // Time up sound - descending
    createTone(330, 0.2, now);      // E4
    createTone(294, 0.2, now + 0.1); // D4
    createTone(262, 0.3, now + 0.2); // C4
    
  } catch (error) {
    console.log('Audio not supported or blocked by browser');
  }
};
