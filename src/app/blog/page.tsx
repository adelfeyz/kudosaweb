import { Metadata } from 'next';
import { getIconUrl, getThumbnailUrl } from '@adelfeyz/sdk';
import { blogAPI, blogUtils } from '@/lib/blog';
import SearchForm from '@/components/blog/SearchForm';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
import { Suspense } from 'react';
import { generateBlogSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { config } from '@/lib/config';

export const metadata: Metadata = {
	title: 'وبلاگ - کادوسا',
	description: 'مطالب بازی‌وارسازی، انگیزه تیمی و بهبود عملکرد از کادوسا.',
	alternates: {
		canonical: '/blog',
	},
	openGraph: {
		title: 'وبلاگ - کادوسا',
		description: 'مطالب بازی‌وارسازی، انگیزه تیمی و بهبود عملکرد از کادوسا.',
		url: `${config.siteUrl}/blog`,
		type: 'website',
		locale: 'fa_IR',
	},
};

function BlogLoading() {
	return (
		<div className="animate-pulse pt-20">
			<section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-16 md:py-24" style={{ backgroundImage: 'linear-gradient(to bottom end, var(--color-primary-600), var(--color-primary-800))' }}>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="max-w-4xl">
						<div className="h-16 bg-white/20 rounded mb-6"></div>
						<div className="h-8 bg-white/20 rounded mb-8 w-3/4"></div>
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
							<div className="h-6 bg-white/20 rounded"></div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 bg-white border-b">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="mb-8">
							<div className="h-12 bg-gray-200 rounded-lg"></div>
						</div>
						<div className="flex flex-wrap items-center gap-4">
							<div className="h-4 bg-gray-200 rounded w-32"></div>
							<div className="flex flex-wrap gap-3">
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className="h-8 bg-gray-200 rounded-full w-24"></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<div className="h-8 bg-gray-200 rounded mb-4 w-48 mx-auto"></div>
							<div className="h-1 w-24 bg-gray-200 mx-auto"></div>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div key={i} className="bg-white rounded-xl shadow-sm p-6">
									<div className="h-48 bg-gray-200 rounded mb-4"></div>
									<div className="h-6 bg-gray-200 rounded mb-3"></div>
									<div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

function BlogError({ error }: { error: string }) {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
			<div className="text-center">
				<i className="fa-solid fa-exclamation-triangle text-6xl text-red-500 mb-6"></i>
				<h1 className="text-2xl font-bold text-gray-900 mb-4">مشکلی پیش آمد</h1>
				<p className="text-gray-600 mb-8">{error}</p>
				<Link
					href="/blog"
					className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-medium"
				>
					تلاش مجدد
				</Link>
			</div>
		</div>
	);
}

async function getBlogData() {
	try {
		const [postsResponse, categoriesResponse] = await Promise.all([
			blogAPI.getPosts({ status: 'published', limit: 12, sort_by: 'published_at', sort_order: 'desc' }),
			blogAPI.getCategories(),
		]);

		return {
			posts: postsResponse.posts,
			categories: categoriesResponse.categories,
			totalPosts: postsResponse.total,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching blog data:', error);
		return {
			posts: [],
			categories: [],
			totalPosts: 0,
			error: error instanceof Error ? error.message : 'بارگذاری اطلاعات وبلاگ با خطا مواجه شد',
		};
	}
}

async function BlogContent() {
	const { posts, categories, totalPosts, error } = await getBlogData();

	if (error) {
		return <BlogError error={error} />;
	}

	const featuredPost = posts.length > 0 ? posts[0] : null;
	const recentPosts = posts.length > 1 ? posts.slice(1, 7) : posts.slice(0, 7);

	return (
		<>
			<section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 pt-32 pb-16 md:pb-24">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 end-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl" />
				</div>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="max-w-4xl">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-6">
							مطالب و بینش‌ها
						</div>
						<h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
							وبلاگ کادوسا
						</h1>
						<p className="text-xl text-white/90 font-medium mb-8">
							راهنمای عملی برای پذیرش هوش مصنوعی و پیاده‌سازی آن در سازمان
						</p>
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
							<p className="text-lg text-white/90 leading-relaxed">
								در اینجا درباره استراتژی هوش مصنوعی، تحول دیجیتال، طراحی عامل‌های هوشمند و تجربه‌های واقعی پیاده‌سازی می‌نویسیم — به زبانی ساده و کاربردی برای مدیران و تیم‌های فنی.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 bg-white border-b">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="mb-8">
							<SearchForm placeholder="جستجوی مطالب..." size="lg" />
						</div>

						<div className="flex flex-wrap items-center gap-4">
							<span className="text-gray-600 font-medium">فیلتر بر اساس دسته‌بندی:</span>
							<div className="flex flex-wrap gap-3">
								<Link href="/blog" className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium cursor-pointer hover:bg-emerald-200 transition">
									همه ({totalPosts})
								</Link>
								{categories.slice(0, 4).map((category) => (
									<Link
										key={category.id}
										href={`/blog/category/${category.slug}`}
										className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition"
									>
										{category.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto">
						<NewsletterSignup
							variant="default"
							title="بینش‌های هفتگی هوش مصنوعی"
							description="به جمع خوانندگان ما بپیوندید و جدیدترین مطالب استراتژی، پیاده‌سازی و روندهای صنعت را در ایمیل خود دریافت کنید."
							emailLabel="آدرس ایمیل"
							emailPlaceholder="ایمیل خود را وارد کنید"
							submitLabel="عضویت در خبرنامه"
							loadingLabel="در حال ثبت..."
							privacyText="بدون اسپم — هر زمان می‌توانید لغو کنید. حریم خصوصی شما محفوظ است."
							successTitle="ثبت شد!"
							subscribeAnotherLabel="ثبت ایمیل دیگر"
							emailRequiredError="ایمیل الزامی است"
							emailInvalidError="لطفاً یک آدرس ایمیل معتبر وارد کنید"
						/>
					</div>
				</div>
			</section>

			{featuredPost && (
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-6xl mx-auto">
							<div className="text-center mb-12">
								<h2 className="text-3xl font-bold text-gray-900 mb-4">مطلب ویژه</h2>
								<div className="h-1 w-24 bg-emerald-500 mx-auto"></div>
							</div>

							<div className="bg-gradient-to-l from-emerald-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
								<div className="grid lg:grid-cols-2 gap-8 items-center p-8">
									<div>
										<div className="flex items-center gap-3 mb-4">
											{featuredPost.categories && featuredPost.categories[0] && (
												<span
													className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium"
													style={{ backgroundColor: featuredPost.categories[0].color }}
												>
													{featuredPost.categories[0].name}
												</span>
											)}
											<span className="text-gray-500 text-sm">
												{featuredPost.reading_time || blogUtils.calculateReadingTime(featuredPost.content)} دقیقه مطالعه
											</span>
										</div>
										<h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
										<p className="text-lg text-gray-600 mb-6">
											{featuredPost.excerpt || blogUtils.getExcerpt(featuredPost.content, 200)}
										</p>
										{featuredPost.author && (
											<div className="flex items-center gap-4 mb-6">
												{featuredPost.author.avatar_url ? (
													<img src={getIconUrl(featuredPost.author.avatar_url)} alt={featuredPost.author.name} className="w-12 h-12 rounded-full object-cover" />
												) : (
													<div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
														<span className="text-emerald-600 font-medium text-sm">
															{featuredPost.author.name ? featuredPost.author.name.charAt(0).toUpperCase() : '?'}
														</span>
													</div>
												)}
												<div>
													<p className="font-semibold text-gray-900">{featuredPost.author.name || 'نویسنده نامشخص'}</p>
													{featuredPost.author.title && (
														<p className="text-gray-600 text-sm">{featuredPost.author.title}</p>
													)}
												</div>
											</div>
										)}
										<Link
											href={`/blog/${featuredPost.slug}`}
											className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition font-medium"
										>
											مطالعه مطلب ←
										</Link>
									</div>
									<div className="relative">
										{featuredPost.featured_image_url ? (
											<img
												className="w-full h-80 object-cover rounded-xl"
												src={getThumbnailUrl(featuredPost.featured_image_url)}
												alt={featuredPost.title}
											/>
										) : (
											<div className="w-full h-80 bg-gray-200 rounded-xl flex items-center justify-center">
												<i className="fa-solid fa-image text-4xl text-gray-400"></i>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			<section id="categories" className="py-16 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">مرور بر اساس دسته‌بندی</h2>
							<div className="h-1 w-24 bg-emerald-500 mx-auto"></div>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{categories.map((category) => (
								<Link
									key={category.id}
									href={`/blog/category/${category.slug}`}
									className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
								>
									<div className="flex items-center gap-4 mb-4">
										<div
											className="w-12 h-12 rounded-lg flex items-center justify-center"
											style={{ backgroundColor: category.color }}
										>
											{category.icon && (
												<i className={`fa-solid ${category.icon} text-white text-xl`}></i>
											)}
										</div>
										<h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition">
											{category.name}
										</h3>
									</div>
									{category.description && (
										<p className="text-gray-600">{category.description}</p>
									)}
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">مطالب اخیر</h2>
							<div className="h-1 w-24 bg-emerald-500 mx-auto"></div>
						</div>

						{posts.length > 0 ? (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
								{recentPosts.map((post) => (
									<article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
										{post.featured_image_url ? (
											<div className="overflow-hidden">
												<img
													src={getThumbnailUrl(post.featured_image_url)}
													alt={post.title}
													className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
												/>
											</div>
										) : (
											<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
												<i className="fa-solid fa-image text-2xl text-gray-400"></i>
											</div>
										)}
										<div className="p-6">
											<div className="flex items-center gap-3 mb-3">
												{post.categories && post.categories[0] && (
													<span
														className="px-2 py-1 text-xs font-medium rounded-full"
														style={{
															backgroundColor: `${post.categories[0].color}20`,
															color: post.categories[0].color,
														}}
													>
														{post.categories[0].name}
													</span>
												)}
												<span className="text-gray-500 text-xs">
													{post.reading_time || blogUtils.calculateReadingTime(post.content)} دقیقه مطالعه
												</span>
											</div>
											<h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
												<Link href={`/blog/${post.slug}`} className="hover:text-emerald-600 transition">
													{post.title}
												</Link>
											</h3>
											<p className="text-gray-600 mb-4 line-clamp-3">
												{post.excerpt || blogUtils.getExcerpt(post.content, 120)}
											</p>
											<div className="flex items-center justify-between">
												{post.author && (
													<div className="flex items-center gap-2">
														{post.author.avatar_url ? (
															<img src={getIconUrl(post.author.avatar_url)} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
														) : (
															<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
																<span className="text-emerald-600 font-medium text-xs">
																	{post.author.name ? post.author.name.charAt(0).toUpperCase() : '?'}
																</span>
															</div>
														)}
														<span className="text-sm text-gray-700">{post.author.name || 'نویسنده نامشخص'}</span>
													</div>
												)}
												<span className="text-sm text-gray-500">
													{blogUtils.formatDate(post.published_at || post.created_at)}
												</span>
											</div>
										</div>
									</article>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<i className="fa-solid fa-newspaper text-4xl text-gray-300 mb-4"></i>
								<h3 className="text-lg font-medium text-gray-900 mb-2">هنوز مطلبی منتشر نشده</h3>
								<p className="text-gray-600">به‌زودی محتوای جدید اضافه می‌شود!</p>
							</div>
						)}

					</div>
				</div>
			</section>

			<SiteFooter />
		</>
	);
}

export default function BlogPage() {
	const blogSchema = generateBlogSchema();
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'خانه', url: '/' },
		{ name: 'وبلاگ', url: '/blog' },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(blogSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			<Suspense fallback={<BlogLoading />}>
				<BlogContent />
			</Suspense>
		</>
	);
}
