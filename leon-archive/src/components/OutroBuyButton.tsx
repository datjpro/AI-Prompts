export function OutroBuyButton() {
  return (
    <div
      id="outro-buy"
      style={{
        transformOrigin: 'right bottom',
        transform: 'scale(0)',
      }}
      className="fixed z-20 pointer-events-none mix-blend-exclusion bg-white rounded-[1335px] flex items-center justify-center bottom-[60px] left-4 right-4 lg:left-auto lg:right-8 lg:bottom-8 lg:w-[330px] h-[100px] lg:h-[174px]"
    >
      <span className="text-white text-[72px] lg:text-[110px] font-medium tracking-[-0.04em] mix-blend-exclusion select-none">
        view
      </span>
    </div>
  );
}
