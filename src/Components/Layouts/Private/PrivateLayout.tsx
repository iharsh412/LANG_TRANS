import { AppLayoutProps } from '../AppLayout.d';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
