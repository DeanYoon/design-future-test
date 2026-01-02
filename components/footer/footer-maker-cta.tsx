import Link from "next/link";

export function FooterMakerCTA() {
  return (
    <section className="py-8 border-b border-gray-200">
      <div className="text-start">
        <h2 className="text-lg font-semibold mb-4">メーカーご担当者様</h2>
        <p className="text-sm text-gray-600 mb-4">
          プロジェクトに採用する建材を日々探しておられる多方面でご活躍中の多数のデザイナー様
          に、ぜひ貴社の魅力的な商品をお届けしませんか？
        </p>
        <Link
          href="/manufacturer"
          className="inline-block px-6 py-2 w-full text-center bg-[#4D4E58] text-white rounded-full text-sm hover:bg-gray-700 transition-colors"
        >
          メーカーの方はこちら
        </Link>
      </div>
    </section>
  );
}

