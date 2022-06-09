type Prefecture = {
  prefCode: number;
  prefName: string;
  checked: boolean;
};

const PrefactureInfo: React.FC<{ prefacture: Prefecture; onChangeCheck: (id: number) => void }> = ({
  prefacture,
  onChangeCheck,
}) => {
  return (
    <li key={prefacture.prefCode} style={{ width: '25%' }}>
      {prefacture.prefCode}
      <label htmlFor={prefacture.prefName}>
        <input
          type="checkbox"
          defaultChecked={prefacture.checked}
          onClick={() => {
            onChangeCheck(prefacture.prefCode);
          }}
          id={prefacture.prefName}
        />
        {prefacture.prefName}
      </label>
    </li>
  );
};

export default PrefactureInfo;
