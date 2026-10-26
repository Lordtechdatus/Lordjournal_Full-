import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ children, currentPage, onNavigate }) {
  return (
    <>
      <Header onNavigate={onNavigate} currentPage={currentPage} />
      {children}
      <Footer />
    </>
  );
}
