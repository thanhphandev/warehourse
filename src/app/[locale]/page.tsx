import Header from '@/components/header';
import {getTranslations} from 'next-intl/server';
 
export default async function HomePage() {
  
  return (
    <div>
      <Header />

    </div>
  );
}