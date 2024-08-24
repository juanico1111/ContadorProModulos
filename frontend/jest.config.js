module.exports = {
    testEnvironment: 'jsdom', // Asegura que se utilice jsdom como entorno de prueba
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    }
  };
  