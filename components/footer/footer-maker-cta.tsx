import Link from "next/link";

export function FooterMakerCTA() {
  return (
    <section className="py-8 ">
      <div className="text-start flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full max-w-lg ">
          <div className="text-lg font-bold mb-4 md:text-3xl">メーカーご担当者様</div>
          <p className="text-sm text-gray-600 mb-4">
            プロジェクトに採用する建材を日々探しておられる多方面でご活躍中の多数のデザイナー様に、ぜひ貴社の魅力的な商品をお届けしませんか？
          </p>
        </div>

        <Link
          href="/manufacturer"
          className="inline-block  py-2 md:py-3 w-full md:max-w-48 text-center bg-primary text-white rounded-full text-sm hover:bg-gray-700 transition-colors"
        >
          メーカーの方はこちら
        </Link>

      </div>
    </section>
  );
}

