import type { Metadata } from 'next';
import { Exo_2 } from 'next/font/google';
import './globals.css';

const exo2 = Exo_2({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: "Liwei's portfolio",
	description: "This is Liwei Yeh's portfolio",
	authors: { name: 'Liwei Yeh' },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body className={`${exo2.className}`}>{children}</body>
		</html>
	);
}
