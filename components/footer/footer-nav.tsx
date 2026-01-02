import Link from "next/link";

const linkClass = "text-sm text-gray-700 hover:text-gray-900 transition-colors block";

export function FooterNav() {
  return (
    <nav className="py-8 border-b border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xs font-medium text-gray-400 mb-4">
            サンプルを探す
          </h3>
          <div className="space-y-2">
            <Link href="/products" className={`${linkClass} flex items-center gap-2`}>
              プロダクト
              <span className="text-xs text-gray-600 bg-white border border-gray-300 px-2 py-0.5 rounded-full">
                新しい
              </span>
            </Link>
            <Link href="/brands" className={linkClass}>
              ブランド
            </Link>
            <Link href="/boards" className={linkClass}>
              ボード
            </Link>
            <Link href="/collections" className={linkClass}>
              コレクション
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-400 mb-4">
            私たちについて
          </h3>
          <div className="space-y-2">
            <Link href="/service" className={linkClass}>
              サービス紹介
            </Link>
            <Link href="/sustainability" className={linkClass}>
              サステナブルな取り組み
            </Link>
            <Link href="/careers" className={linkClass}>
              求人情報
            </Link>
            <Link href="/company" className={linkClass}>
              会社概要
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-400 mb-4">
            アカウント
          </h3>
          <div className="space-y-2">
            <Link href="/profile" className={linkClass}>
              マイプロフィール
            </Link>
            <Link href="/address" className={linkClass}>
              アドレスブック
            </Link>
            <Link href="/orders" className={linkClass}>
              オーダー履歴
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-gray-400 mb-4">サポート</h3>
          <div className="space-y-2">
            <Link href="/faq" className={linkClass}>
              よくある質問
            </Link>
            <Link href="/privacy" className={linkClass}>
              プライバシーポリシーセンター
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

