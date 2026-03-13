"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";

const cdList = [
  { title: "しらさぎ情歌", price: 500, soldOut: false },
  { title: "夢の残り火", price: 2000, soldOut: false },
  { title: "風の吹く坂道", price: 2000, soldOut: false },
  { title: "小曲集Ⅱ「書簡」", price: 1000, soldOut: true },
  { title: "小曲集Ⅰ", price: 1000, soldOut: true },
  { title: "心の響き", price: 2000, soldOut: false },
  { title: "生命の詩", price: 2000, soldOut: false },
];

type CdOrder = { [title: string]: number };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    postalCode: "",
    address: "",
  });
  const [eventDetails, setEventDetails] = useState({
    date: "",
    venue: "",
    address: "",
    audience: "",
    capacity: "",
    theme: "",
    budget: "",
  });
  const [cdOrder, setCdOrder] = useState<CdOrder>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleCdQuantity = (title: string, qty: number) => {
    setCdOrder((prev) => {
      const next = { ...prev };
      if (qty === 0) {
        delete next[title];
      } else {
        next[title] = qty;
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const payload = {
        ...formData,
        ...(formData.subject === "講演会のご相談・ご依頼" || formData.subject === "コンサートのご相談・ご依頼"
          ? { eventDetails }
          : {}),
        ...(formData.subject === "CDのご注文" ? { cdOrder } : {}),
      };

      const GAS_URL = process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL;
      if (!GAS_URL) throw new Error("送信先が設定されていません");

      await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        mode: "no-cors",
      });

      setStatus("sent");
      setFormData({ name: "", organization: "", email: "", phone: "", subject: "", message: "", postalCode: "", address: "" });
      setEventDetails({ date: "", venue: "", address: "", audience: "", capacity: "", theme: "", budget: "" });
      setCdOrder({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="py-14 px-4 bg-section-alt">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title="お問い合わせ" subtitle="フォーム・メール・お電話にてお気軽にご連絡ください" />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="bg-card-bg rounded-2xl p-8 md:p-10 shadow-sm">
              {status === "sent" ? (
                <div className="text-center py-8">
                  <p className="text-primary font-bold text-lg mb-2">
                    送信完了
                  </p>
                  <p className="text-foreground/60">
                    お問い合わせありがとうございます。
                    <br />
                    内容を確認の上、折り返しご連絡いたします。
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-primary hover:text-accent transition-colors"
                  >
                    新しいお問い合わせ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      お名前（担当者名） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background focus:outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      主催者名
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background focus:outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background focus:outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      電話番号・FAX
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background focus:outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background focus:outline-none focus:border-primary/30 transition-colors"
                    >
                      <option value="">選択してください</option>
                      <option value="講演会のご相談・ご依頼">講演会のご相談・ご依頼</option>
                      <option value="コンサートのご相談・ご依頼">コンサートのご相談・ご依頼</option>
                      <option value="CDのご注文">CDのご注文</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  {/* 講演会・コンサート詳細 */}
                  {(formData.subject === "講演会のご相談・ご依頼" || formData.subject === "コンサートのご相談・ご依頼") && (
                    <div className="space-y-4 p-4 rounded-xl border border-primary/10 bg-background">
                      <p className="text-sm font-medium">
                        {formData.subject === "講演会のご相談・ご依頼" ? "講演会" : "コンサート"}の詳細
                        <span className="text-xs text-muted ml-2">※わかる範囲でご記入ください</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted mb-1">希望日時</label>
                          <input
                            type="text"
                            value={eventDetails.date}
                            onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                            placeholder="例：2026年5月頃、○月○日"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted mb-1">会場</label>
                          <input
                            type="text"
                            value={eventDetails.venue}
                            onChange={(e) => setEventDetails({ ...eventDetails, venue: e.target.value })}
                            placeholder="例：○○市民会館"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs text-muted mb-1">住所</label>
                          <input
                            type="text"
                            value={eventDetails.address}
                            onChange={(e) => setEventDetails({ ...eventDetails, address: e.target.value })}
                            placeholder="例：兵庫県姫路市○○町1-2-3"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted mb-1">対象者</label>
                          <input
                            type="text"
                            value={eventDetails.audience}
                            onChange={(e) => setEventDetails({ ...eventDetails, audience: e.target.value })}
                            placeholder="例：小学生、一般、福祉関係者"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted mb-1">参加人数（予定）</label>
                          <input
                            type="text"
                            value={eventDetails.capacity}
                            onChange={(e) => setEventDetails({ ...eventDetails, capacity: e.target.value })}
                            placeholder="例：約100名"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                      </div>
                      {formData.subject === "講演会のご相談・ご依頼" && (
                        <div>
                          <label className="block text-xs text-muted mb-1">テーマ・ご要望</label>
                          <input
                            type="text"
                            value={eventDetails.theme}
                            onChange={(e) => setEventDetails({ ...eventDetails, theme: e.target.value })}
                            placeholder="例：人権、命の大切さ、夢について"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-xs text-muted mb-1">予算</label>
                        <input
                          type="text"
                          value={eventDetails.budget}
                          onChange={(e) => setEventDetails({ ...eventDetails, budget: e.target.value })}
                          placeholder="例：○○万円程度"
                          className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* 住所（CD注文時） */}
                  {formData.subject === "CDのご注文" && (
                    <div className="space-y-4 p-4 rounded-xl border border-primary/10 bg-background">
                      <p className="text-sm font-medium">
                        お届け先
                        <span className="text-red-500 ml-1">*</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-muted mb-1">郵便番号</label>
                          <input
                            type="text"
                            required
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            placeholder="例：670-0000"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs text-muted mb-1">住所</label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="例：兵庫県姫路市○○町1-2-3"
                            className="w-full px-3 py-2 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CD注文セクション */}
                  {formData.subject === "CDのご注文" && (
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        ご注文のCD <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {cdList.map((cd) => (
                          <div
                            key={cd.title}
                            className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                              cd.soldOut
                                ? "border-primary/5 bg-foreground/[0.02] opacity-50"
                                : "border-primary/10 bg-background"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{cd.title}</p>
                              <p className="text-xs text-muted">
                                ¥{cd.price.toLocaleString()}（税込）
                                {cd.soldOut && "　※品切れ"}
                              </p>
                            </div>
                            {cd.soldOut ? (
                              <span className="text-xs text-muted ml-4">品切れ</span>
                            ) : (
                              <select
                                value={cdOrder[cd.title] || 0}
                                onChange={(e) =>
                                  handleCdQuantity(cd.title, Number(e.target.value))
                                }
                                className="ml-4 px-3 py-1.5 rounded-lg border border-primary/10 bg-background text-sm focus:outline-none focus:border-primary/30"
                              >
                                {[0, 1, 2, 3, 4, 5].map((n) => (
                                  <option key={n} value={n}>
                                    {n === 0 ? "—" : `${n}枚`}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                      {Object.keys(cdOrder).length > 0 && (
                        <div className="mt-3 p-3 rounded-xl bg-primary/5 text-sm">
                          <p className="font-medium text-primary">
                            合計：¥{Object.entries(cdOrder).reduce((sum, [title, qty]) => {
                              const cd = cdList.find((c) => c.title === title);
                              return sum + (cd ? cd.price * qty : 0);
                            }, 0).toLocaleString()}（税込）＋送料200円
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {formData.subject === "講演会のご相談・ご依頼" || formData.subject === "コンサートのご相談・ご依頼"
                        ? "その他伝えたいこと"
                        : "メッセージ"}{" "}
                      {formData.subject !== "CDのご注文" && formData.subject !== "講演会のご相談・ご依頼" && formData.subject !== "コンサートのご相談・ご依頼" && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      required={formData.subject !== "CDのご注文" && formData.subject !== "講演会のご相談・ご依頼" && formData.subject !== "コンサートのご相談・ご依頼"}
                      rows={formData.subject === "CDのご注文" ? 3 : formData.subject === "講演会のご相談・ご依頼" || formData.subject === "コンサートのご相談・ご依頼" ? 4 : 6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        formData.subject === "CDのご注文"
                          ? "その他ご要望がありましたらご記入ください。"
                          : formData.subject === "講演会のご相談・ご依頼" || formData.subject === "コンサートのご相談・ご依頼"
                          ? "照明・美術・費用など、ご相談事項等がありましたらご記入ください。"
                          : "お気軽にメッセージをお寄せください。"
                      }
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background focus:outline-none focus:border-primary/30 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm">
                      送信に失敗しました。もう一度お試しください。
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending" || (formData.subject === "CDのご注文" && Object.keys(cdOrder).length === 0)}
                    className="w-full bg-primary text-white py-3 rounded-full hover:bg-accent transition-colors font-medium disabled:opacity-50"
                  >
                    {status === "sending" ? "送信中..." : "送信する"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* メール・電話でのお問い合わせ（送信完了時は非表示） */}
      {status !== "sent" && <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="bg-card-bg rounded-2xl p-8 md:p-10 shadow-sm text-center">
              <h3 className="font-serif text-lg font-bold mb-4">
                メールやお電話でもお気軽にどうぞ
              </h3>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <div>
                  <p className="text-sm mb-1">Eメール</p>
                  <a
                    href="mailto:yumeplan1962@ezweb.ne.jp"
                    className="text-primary hover:text-accent transition-colors font-medium"
                  >
                    yumeplan1962@ezweb.ne.jp
                  </a>
                  <p className="text-xs text-muted mt-1">＊本人に直接届きます</p>
                </div>
                <p className="text-sm text-foreground/40">または</p>
                <div>
                  <p className="text-sm mb-1">TEL / FAX</p>
                  <p className="text-primary font-medium text-lg">079-235-6185</p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-foreground/10">
                <p className="text-xs text-muted leading-relaxed">
                  ※メールを送って3日以内に返信がない場合は通信トラブルの可能性がありますので、<br className="hidden sm:inline" />
                  お手数ですが再送くださるか、電話またはFAXでご一報ください。
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>}
    </div>
  );
}
