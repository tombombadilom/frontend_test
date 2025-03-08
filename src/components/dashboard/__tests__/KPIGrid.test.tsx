import { render, screen } from '@testing-library/react';
import { ArrowDown, ArrowUp, DollarSign, Users, ShoppingCart, Package } from 'lucide-react';
import KPIGrid from '../KPIGrid';

const mockData = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '€45,231.89',
    change: 20.1,
    icon: DollarSign,
  },
  {
    id: '2',
    title: 'Active Users',
    value: '2,350',
    change: 15.2,
    icon: Users,
  },
  {
    id: '3',
    title: 'Sales',
    value: '1,234',
    change: -12.3,
    icon: ShoppingCart,
  },
  {
    id: '4',
    title: 'Products',
    value: '573',
    change: 8.5,
    icon: Package,
  },
];

describe('KPIGrid', () => {
  it('renders loading state initially', () => {
    render(<KPIGrid data={[]} isLoading />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    
    const cards = screen.getAllByRole('gridcell');
    expect(cards).toHaveLength(4);
    for (const card of cards) {
      expect(card).toHaveTextContent('Loading...');
    }
  });

  it('renders KPI data correctly', () => {
    render(<KPIGrid data={mockData} />);
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');

    for (const item of mockData) {
      const card = screen.getByRole('gridcell', {
        name: `${item.title} ${item.value} ${item.change > 0 ? '+' : ''}${item.change}%`
      });
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(item.title);
      expect(card).toHaveTextContent(item.value);
      expect(card).toHaveTextContent(`${item.change > 0 ? '+' : ''}${item.change}%`);
    }
  });

  it('applies custom class names correctly', () => {
    render(<KPIGrid data={mockData} className="custom-grid" />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('custom-grid');
  });

  it('shows correct trend indicators', () => {
    render(<KPIGrid data={mockData} />);

    // Vérifier les tendances positives
    const positiveCards = mockData.filter((item) => item.change > 0);
    for (const item of positiveCards) {
      const card = screen.getByRole('gridcell', {
        name: `${item.title} ${item.value} +${item.change}%`
      });
      expect(card.querySelector('.text-green-500')).toBeInTheDocument();
    }

    // Vérifier les tendances négatives
    const negativeCards = mockData.filter((item) => item.change < 0);
    for (const item of negativeCards) {
      const card = screen.getByRole('gridcell', {
        name: `${item.title} ${item.value} ${item.change}%`
      });
      expect(card.querySelector('.text-red-500')).toBeInTheDocument();
    }
  });
}); 