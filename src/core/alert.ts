export type AppAlert = {
  status: string;
  title: string;
  description: string | null;
};

export const deleteAlert = (index: number, alerts: AppAlert[]): AppAlert[] => {
  return [...alerts.slice(0, index), ...alerts.slice(index + 1)];
};
