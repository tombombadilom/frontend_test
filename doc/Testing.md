# Testing Documentation

## Overview

The project uses Vitest for unit testing, providing a comprehensive test suite for components and functionality.

## Test Structure

### Test Files Location
- Component tests: `src/components/**/__tests__/*.test.tsx`
- Hook tests: `src/hooks/__tests__/*.test.tsx`
- Utility tests: `src/lib/__tests__/*.test.ts`

### Test Categories

#### Component Tests
- UI Components
- Layout Components
- Feature Components
- Integration Tests

#### Hook Tests
- Custom React Hooks
- State Management Hooks
- Utility Hooks

#### Mock Data
- Located in `src/test/mocks/`
- Provides consistent test data
- Simulates API responses

## Test Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Testing Guidelines

### Component Testing
- Test component rendering
- Test user interactions
- Test state changes
- Test prop changes
- Test error states

### Hook Testing
- Test hook initialization
- Test state updates
- Test side effects
- Test cleanup

### Best Practices
- Use meaningful test descriptions
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases
- Maintain test isolation

## Coverage Requirements

- Minimum 80% coverage for all files
- 100% coverage for critical paths
- Coverage reports generated in `coverage/`

## Continuous Integration

- Tests run on every push and pull request
- Coverage reports uploaded to Codecov
- SonarQube integration for code quality 