// src/components/Documents/DocumentList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentList from './DocumentList';

test('renders DocumentList component', () => {
  render(<DocumentList />);
  expect(screen.getByText(/Lista de Documentos/i)).toBeInTheDocument();
});
