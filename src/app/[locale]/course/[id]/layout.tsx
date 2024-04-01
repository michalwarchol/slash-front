import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode | ReactNode[];
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params: { locale } }: IProps) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
