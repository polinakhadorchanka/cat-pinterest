import { Nav } from '../index.ts';

const Header = () => {
  return (
    <div className={'w-full bg-primary shadow-custom'}>
      <div className={'container flex flex-row'}>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
