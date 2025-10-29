# Contributing to JOBORBIT

Thank you for your interest in contributing to JOBORBIT! 🎉

## How to Contribute

### Reporting Bugs
- Use GitHub Issues
- Include screenshots if applicable
- Describe steps to reproduce

### Suggesting Features
- Open a feature request issue
- Explain the use case
- Provide mockups if possible

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments where needed
   - Test your changes

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Keep components small and focused
- Add proper TypeScript types

## Component Structure

```typescript
import { SomeType } from '@/types';

interface ComponentProps {
  // Props definition
}

export default function ComponentName({ props }: ComponentProps) {
  // Component logic
  
  return (
    // JSX
  );
}
```

## Testing
- Test on multiple screen sizes
- Check browser compatibility
- Verify animations work smoothly

## Documentation
- Update README if needed
- Add comments for complex logic
- Update type definitions

## Questions?
Open an issue for discussion!

Thank you for contributing! 🚀
