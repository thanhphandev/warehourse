import {routing} from '@/i18n/routing';
import messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
    Locale: (typeof routing.locales)[number];
  }
}