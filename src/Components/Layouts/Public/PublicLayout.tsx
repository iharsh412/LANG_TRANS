import { AppLayoutProps } from '../AppLayout.d';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
