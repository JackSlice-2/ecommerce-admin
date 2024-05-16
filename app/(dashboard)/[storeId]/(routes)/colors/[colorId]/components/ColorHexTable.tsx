import React from 'react';
import toast from 'react-hot-toast';

interface HexCode {
  hexCode: string;
  name: string;
}

interface ColorHexTableProps {
  hexCodes: HexCode[];
  onSelectHexCode?: (hexCode: string, name: string) => void;
}

const ColorHexTable: React.FC<ColorHexTableProps> = ({ hexCodes, onSelectHexCode }) => {

  return (
    <div className="max-w-screen text-center">
      <h1 className="py-2 text-4xl">Hex Codes</h1>
      <h1 className="text-muted-foreground text-md">Click on the Color you would like to add</h1>
      <div className="p-5 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 lg:mx-10 gap-5">
        {hexCodes.map((code) => (
          <div key={code.hexCode} className="col-span-1">
            <button
              onClick={() => {
                if (onSelectHexCode) {
                  onSelectHexCode(code.hexCode, code.name);
                  toast.success('Color Added!');
                }
              }} 
              className="text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              style={{ 
                background: `${code.hexCode}`,
                width: '100%',
                height: '100%'
              }}
            >
              {code.hexCode}
            </button>
          </div>
        ))}
      </div>
        <hr />
      <h1 className="px-4 py-2 text-2xl p-2">For More Colors Access...</h1>
      <div className='m-2'>
        <a href="https://www.color-hex.com/" target="_blank" rel="noreferrer" className='p-2 bg-blue-800/30 rounded-xl hover:bg-blue-600'>
          ColorHex.com
        </a>
      </div>
    </div>
  );
};

export default ColorHexTable;
