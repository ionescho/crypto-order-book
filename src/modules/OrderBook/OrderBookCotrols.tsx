import type { FC } from "react";

type Props = {
};

export const OrderBookControls: FC<Props> = () => {

    return (
        <div style={{
          fontSize: "12px",
          fontFamily: "monospace",
          display: "flex",
          justifyContent: "space-between",
          lineHeight: '20px',
          color: 'var(--text-secondary)',
        }}>
            <div style={{  flex: '1 1 0%', textAlign: 'left' }}>Price</div>
            <div style={{  flex: '1 1', textAlign: 'right' }}>Amount</div>
            <div style={{  flex: '1 1', textAlign: 'right' }}>Total</div>
        </div>
    );
};
