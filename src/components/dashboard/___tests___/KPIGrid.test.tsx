import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KPIGrid from '../KPIGrid';
import { Activity, Database } from 'lucide-react';

const mockData = [
  {
    id: '1',
    title: 'Test KPI 1',
    value: '1,000',
    change: 10,
    icon: Activity,
  },
  {
    id: '2',
    title: 'Test KPI 2',
    value: '2,000',
    change: -5,
    icon: Database,
  },
];

describe('KPIGrid', () => {
  it('renders loading state initially', () => {
    render(<KPIGrid data={[]} isLoading />);
    
    // Vérifier que les skeletons sont présents
    const skeletons = screen.getAllByRole('gridcell');
    expect(skeletons).toHaveLength(4);
  });

  it('renders KPI cards with provided data', () => {
    render(<KPIGrid data={mockData} />);

    // Vérifier que les titres sont présents
    expect(screen.getByText('Test KPI 1')).toBeInTheDocument();
    expect(screen.getByText('Test KPI 2')).toBeInTheDocument();

    // Vérifier que les valeurs sont présentes
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('2,000')).toBeInTheDocument();

    // Vérifier que les tendances sont présentes
    expect(screen.getByText('+10%')).toBeInTheDocument();
    expect(screen.getByText('-5%')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-grid-class';
    render(<KPIGrid data={mockData} className={customClass} />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass(customClass);
  });

  it('displays correct trend icons and colors', () => {
    render(<KPIGrid data={mockData} />);

    // Vérifier les icônes de tendance
    const upTrend = screen.getByText('+10%').closest('div');
    const downTrend = screen.getByText('-5%').closest('div');

    expect(upTrend).toHaveClass('text-green-500');
    expect(downTrend).toHaveClass('text-red-500');
  });
}); 