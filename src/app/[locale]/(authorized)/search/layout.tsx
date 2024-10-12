import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode | ReactNode[];
}

export default function LocaleLayout({ children }: IProps) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
