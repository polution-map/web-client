/* eslint-disable no-nested-ternary */
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ArrowControl } from 'src/components/ranges/ArrowControl';
import { RangeSlider } from 'src/components/ranges/RangeSlider';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce/lib';

const StyledRangesControl = styled.div`
  ${({ orientation }) => orientation === 'horizontal' && `margin-right: 2vh`};
  ${({ orientation }) => orientation === 'vertical' && `margin-bottom: 2vh`};

  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical'
      ? 'row'
      : orientation === 'horizontal'
      ? 'column'
      : null};
  &&.sweep-enter {
    opacity: 0;
    transform: scale(0.9);
    transform: ${({ orientation }) =>
      orientation === 'vertical'
        ? 'translateY(100%)'
        : orientation === 'horizontal'
        ? 'translateX(100%)'
        : null};
    transition: opacity 400ms, transform 200ms;
  }
  &&.sweep-enter-active {
    opacity: 1;
    transform: ${({ orientation }) =>
      orientation === 'vertical'
        ? 'translateY(0)'
        : orientation === 'horizontal'
        ? 'translateX(0)'
        : null};
    transition: opacity 600ms, transform 200ms;
  }
  &&.sweep-exit {
    transform: ${({ orientation }) =>
      orientation === 'vertical'
        ? 'translateY(0)'
        : orientation === 'horizontal'
        ? 'translateX(0)'
        : null};
    opacity: 1;
  }
  &&.sweep-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transform: ${({ orientation }) =>
      orientation === 'vertical'
        ? 'translateY(100%)'
        : orientation === 'horizontal'
        ? 'translateX(100%)'
        : null};
    transition: opacity 400ms, transform 400ms;
  }
`;
export const RangesControl = observer(({ orientation }) => {
  const { rangesStore } = useStore();
  const [isVisiable, setButtonActive] = useState(false);

  const onRangeChange = useDebouncedCallback((range, values) => {
    rangesStore.setRangeValues(range, values);
  }, 300);
  return (
    <ArrowControl
      title="Выбор диапазонов"
      titlePlacemet={
        orientation === 'vertical'
          ? 'left'
          : orientation === 'horizontal'
          ? 'top-end'
          : null
      }
      orientation={orientation}
      isActive={isVisiable}
      onToggle={setButtonActive}
      position="bottom-right"
    >
      <CSSTransition
        classNames="sweep"
        in={isVisiable}
        timeout={300}
        unmountOnExit
      >
        <StyledRangesControl orientation={orientation}>
          {rangesStore.Ranges.map((r) => (
            <RangeSlider
              key={`slider${r.name}`}
              range={r}
              onRangeChange={onRangeChange}
              orientation={orientation}
            />
          ))}
        </StyledRangesControl>
      </CSSTransition>
    </ArrowControl>
  );
});
