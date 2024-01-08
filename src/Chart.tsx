import { useState } from 'react';
import { useElementSize } from 'usehooks-ts';

const AMOUNT_OF_RINGS = 6;
const INVERSED_45_DEGREES_IN_RADIANS = -Math.PI / 4;

interface Props {
  toolMatches: Record<string, Record<string, number>>;
  toolCounts: Record<
    string,
    Record<
      | 'never_heard'
      | 'not_interested'
      | 'interested'
      | 'would_use'
      | 'would_not_use',
      number
    >
  >;
}

export default function Chart({ toolMatches, toolCounts }: Props) {
  const tools = Object.keys(toolMatches);
  const randomFocusedTool = tools[Math.floor(Math.random() * tools.length)];

  const [focusedTool, setFocusedTool] = useState(randomFocusedTool);
  const [chartRef, { width }] = useElementSize();

  // NOTE: Using `848` as fallback due to https://github.com/juliencrn/usehooks-ts/issues/253
  const radius = (width || 848) / 2;

  const ringRadii = [...Array(AMOUNT_OF_RINGS).keys()]
    .map((value) => value + 1)
    .map((value) => (radius * value) / AMOUNT_OF_RINGS);

  const annotationLinePosition = {
    endX: Math.cos(INVERSED_45_DEGREES_IN_RADIANS) * radius,
    endY: Math.sin(INVERSED_45_DEGREES_IN_RADIANS) * radius,
  };

  const annotationLinePath = [
    'M 0 0',
    `L ${annotationLinePosition.endX} ${annotationLinePosition.endY}`,
    `L ${annotationLinePosition.endX} ${annotationLinePosition.endY}`,
    `L ${annotationLinePosition.endX} ${annotationLinePosition.endY}`,
    `L ${annotationLinePosition.endX} ${annotationLinePosition.endY + 2}`,
  ].join(' ');

  return (
    <div ref={chartRef} className="relative">
      <div className="absolute top-0 left-0 w-40 text-sm">
        Use your{' '}
        <span onClick={() => {}} className="p-0.5 rounded bg-stone-300">
          &lt;-
        </span>{' '}
        and{' '}
        <span onClick={() => {}} className="p-0.5 rounded bg-stone-300">
          -&gt;
        </span>{' '}
        arrow keys to cycle through tools.
        <br />
        Or click a specific tool to focus on it.
      </div>

      <div className="absolute top-0 right-0 text-right w-40 text-sm">
        Tools that are less likely to be used by
        <div className="bg-blue-600 text-white font-semibold px-3 py-1 rounded">
          {focusedTool}
        </div>
        are further from the center
      </div>

      <svg width={width} height={width}>
        <g transform={`translate(${width / 2}, ${width / 2})`}>
          {ringRadii.map((ringRadius) => (
            <circle
              key={ringRadius}
              r={ringRadius}
              className="fill-none stroke-stone-300"
            />
          ))}

          <path d={annotationLinePath} />
        </g>
      </svg>
    </div>
  );
}
