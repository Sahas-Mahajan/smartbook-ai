function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">
              SmartBook
            </h2>

            <p className="text-sm mt-1">
              AI-powered book discovery for every reader.
            </p>
          </div>

          {/* Copyright */}
          <p className="text-sm text-center">
            © {new Date().getFullYear()} SmartBook. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;