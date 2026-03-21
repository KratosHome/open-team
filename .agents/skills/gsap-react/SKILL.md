---
name: gsap-react
description: GSAP integration for React with lifecycle-aware hooks, ref patterns, and automatic cleanup. Use this skill when the user wants to implement animations in React using GSAP, specifically with the `useGSAP` hook, `contextSafe`, ScrollTrigger, or complex timeline management.
---

# GSAP React Integration

React-specific patterns for GSAP animations.

## Quick Start

```bash
npm install gsap @gsap/react
```

```javascript
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Component() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    gsap.to('.box', { x: 200, duration: 1 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="box">Animated</div>
    </div>
  );
}
```

## useGSAP Hook

### Basic Usage
```javascript
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function AnimatedComponent() {
  const container = useRef(null);
  
  useGSAP(() => {
    // All GSAP animations here
    gsap.from('.item', { opacity: 0, y: 50, stagger: 0.1 });
  }, { scope: container }); // Scope limits selector queries

  return (
    <div ref={container}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  );
}
```

### With Dependencies
```javascript
function AnimatedComponent({ isOpen }) {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.to('.drawer', { height: isOpen ? 'auto' : 0, duration: 0.3 });
  }, { scope: container, dependencies: [isOpen] });

  return (
    <div ref={container}>
      <div className="drawer">Content</div>
    </div>
  );
}
```

### Returning Context
```javascript
function Component() {
  const container = useRef(null);
  const { context, contextSafe } = useGSAP(() => {
    gsap.to('.box', { x: 200 });
  }, { scope: container });

  // Use contextSafe for event handlers
  const handleClick = contextSafe(() => {
    gsap.to('.box', { rotation: 360 });
  });

  return (
    <div ref={container}>
      <div className="box" onClick={handleClick}>Click me</div>
    </div>
  );
}
```

## Ref Patterns

### Single Element Ref
```javascript
function SingleElement() {
  const boxRef = useRef(null);
  useGSAP(() => {
    gsap.to(boxRef.current, { x: 200, rotation: 360, duration: 1 });
  });
  return <div ref={boxRef}>Box</div>;
}
```

### Multiple Element Refs
```javascript
function MultipleElements() {
  const itemsRef = useRef([]);
  useGSAP(() => {
    gsap.from(itemsRef.current, { opacity: 0, y: 30, stagger: 0.1 });
  });
  return (
    <div>
      {[1, 2, 3].map((item, i) => (
        <div key={item} ref={el => itemsRef.current[i] = el}>
          Item {item}
        </div>
      ))}
    </div>
  );
}
```

### Dynamic Refs
```javascript
function DynamicList({ items }) {
  const itemsRef = useRef(new Map());
  
  useGSAP(() => {
    gsap.from(Array.from(itemsRef.current.values()), { 
      opacity: 0, 
      y: 20, 
      stagger: 0.05 
    });
  }, { dependencies: [items.length] });

  return (
    <div>
      {items.map(item => (
        <div key={item.id} ref={el => {
          if (el) itemsRef.current.set(item.id, el);
          else itemsRef.current.delete(item.id);
        }}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

## Context and Cleanup

### Automatic Cleanup
`useGSAP` automatically cleans up animations on unmount.

### Manual Context (Without useGSAP)
```javascript
import gsap from 'gsap';

function Component() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.box', { x: 200 });
      gsap.to('.circle', { rotation: 360 });
    });
    return () => ctx.revert(); // Cleanup
  }, []);
}
```

## Event Handlers

### contextSafe for Events
```javascript
function InteractiveComponent() {
  const container = useRef(null);
  const { contextSafe } = useGSAP(() => {
    // Initial animation
    gsap.set('.box', { scale: 1 });
  }, { scope: container });

  const handleMouseEnter = contextSafe(() => {
    gsap.to('.box', { scale: 1.1, duration: 0.2 });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to('.box', { scale: 1, duration: 0.2 });
  });

  return (
    <div ref={container}>
      <div className="box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Hover me
      </div>
    </div>
  );
}
```

## Timeline Management

### Timeline Ref Pattern
```javascript
function TimelineComponent() {
  const container = useRef(null);
  const tl = useRef(null);
  
  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to('.box', { x: 200 })
      .to('.box', { y: 100 })
      .to('.box', { rotation: 360 });
  }, { scope: container });

  const play = () => tl.current?.play();
  const reverse = () => tl.current?.reverse();
  const restart = () => tl.current?.restart();

  return (
    <div ref={container}>
      <div className="box">Animated</div>
      <button onClick={play}>Play</button>
      <button onClick={reverse}>Reverse</button>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
```

## ScrollTrigger in React

### Basic ScrollTrigger
```javascript
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollComponent() {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.from('.section', {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: '.section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="section">Scroll to reveal</div>
    </div>
  );
}
```

## Performance Tips

1.  **Use will-change for heavy animations**: `gsap.set('.animated', { willChange: 'transform' });`
2.  **Batch similar animations**: Use single tweens with staggers rather than loops with multiple tweens.
3.  **Use refs over selectors** for frequently animated elements.
4.  **Kill animations** on rapid state changes if not using `useGSAP`.

## Reference
- GSAP Documentation
- @gsap/react Documentation
