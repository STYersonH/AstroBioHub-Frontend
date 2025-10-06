import { Link } from "react-router";
import { motion } from "framer-motion";

const ArticlesListPage = () => {
  const articles = [
    {
      id: "a",
      title: "Mice in Space: The Adventure of the Bion-M 1 Mission",
      description:
        "Learn about the brave mice that went to space for 30 days and what scientists discovered about microgravity effects.",
    },
    {
      id: "b",
      title: "Bones in Space: Why Do They Weaken?",
      description:
        'Discover the "triple attack" that causes bone loss in space and how it affects astronauts.',
    },
    {
      id: "c",
      title: "Microgravity and Cellular Biology: What Happens to Our Cells?",
      description:
        "Explore how microgravity changes cell behavior and its implications for medicine.",
    },
    {
      id: "d",
      title: "High-Risk Plaques: How Does Blood Flow Matter?",
      description:
        "Understand how blood flow patterns can predict stroke risk in carotid arteries.",
    },
    {
      id: "e",
      title: "Danish Psychiatric Registries: Are the Data Stable?",
      description:
        "Investigate whether changes in medical record systems affect research reliability.",
    },
    {
      id: "f",
      title: 'RNA Editing in Bacteria: The Genetic "Auto-Correct"',
      description:
        "Learn about bacterial RNA editing and how it helps them adapt to hostile environments.",
    },
    {
      id: "g",
      title: "Controlling Electron Spin for Future Computing",
      description:
        "Discover how scientists control electron spin to develop next-generation computers.",
    },
    {
      id: "h",
      title: "The Brain Map of Verbal Memory",
      description:
        "Understand how different brain areas work together to help us remember words.",
    },
    {
      id: "i",
      title: "ICU Pneumonia: Does Inhaling Antibiotics Work?",
      description:
        "Explore whether nebulized antibiotics are more effective and safer for ICU patients.",
    },
    {
      id: "j",
      title: "Eels in Danger: The Impact of Chemical Pollution",
      description:
        "Learn about how chemical pollution affects European eels and poses health risks.",
    },
    {
      id: "k",
      title: "Muscles in Space: Accelerated Aging?",
      description:
        "Discover how space affects muscle cells and what it tells us about aging.",
    },
    {
      id: "l",
      title: "Stem Cells in Space: The Secret to Youth?",
      description:
        "Explore how microgravity affects stem cell growth and differentiation.",
    },
    {
      id: "m",
      title: "Your Brain in Space: A Journey of Changes",
      description:
        "Understand the dual effects of space travel on the human brain.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Artículos Científicos
            </h1>
            <p className="max-w-3xl text-lg text-gray-600">
              Explora una colección de artículos científicos sobre biología
              espacial, investigación médica y avances tecnológicos. Cada
              artículo presenta hallazgos fascinantes en un formato accesible y
              visual.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/article/${article.id}`}
                className="block h-full rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-xl font-bold text-blue-600">
                    {article.id.toUpperCase()}
                  </span>
                </div>
                <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  Leer más
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Back to Home */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlesListPage;
