import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AlertDialog from '../../components/Admin/AdminPlan/AlertDialog';

describe('AlertDialog Component', () => {
  const mockSetOnDelete = jest.fn();
  const mockConfirmDeleteItem = jest.fn();

  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <AlertDialog
        setOnDelete={mockSetOnDelete}
        confirmDeleteItem={mockConfirmDeleteItem}
      />
    ));
  });

  test('TC-01: It renders without crashing', () => {
    const dialogTitle = getByText('Are you sure you want to delete this plan?');
    expect(dialogTitle).toBeInTheDocument();
  });

  test('TC-02: It calls confirmDeleteItem function with correct argument on button click', () => {
    const noButton = getByText('No');
    const yesButton = getByText('Yes');

    fireEvent.click(noButton);
    expect(mockConfirmDeleteItem).toHaveBeenCalledWith('no');

    fireEvent.click(yesButton);
    expect(mockConfirmDeleteItem).toHaveBeenCalledWith('yes');
  });

  test('TC-03: It calls setOnDelete function with false on button click', () => {
    const noButton = getByText('No');
    const yesButton = getByText('Yes');

    fireEvent.click(noButton);
    expect(mockSetOnDelete).toHaveBeenCalledWith(false);

    fireEvent.click(yesButton);
    expect(mockSetOnDelete).toHaveBeenCalledWith(false);
  });
});
