import styles from './Telemetry.module.css';

const NAV_DATA = [
  { label: 'LAT', value: '-23.10458°' },
  { label: 'LON', value: '-45.71472°' },
  { label: 'ALT', value: '00642 FT' },
];

const STATUS_DATA = [
  { label: 'SYS', value: 'NOMINAL' },
  { label: 'HDG', value: '270 · MACH 0.78' },
  { label: 'EMB', value: 'INTERNSHIP 2026.2' },
];

export default function Telemetry() {
  return (
    <div className={styles.telemetry} aria-hidden="true">
      <dl className={`${styles.readout} ${styles.topLeft}`}>
        {NAV_DATA.map((item) => (
          <div key={item.label} className={styles.row}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <dl className={`${styles.readout} ${styles.bottomRight}`}>
        {STATUS_DATA.map((item) => (
          <div key={item.label} className={styles.row}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
