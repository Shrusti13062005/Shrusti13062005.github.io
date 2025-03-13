function Header() {
    try {
        return (
            <header data-name="header" className="bg-white shadow-md">
                <div data-name="header-container" className="container mx-auto px-4 py-6">
                    <h1 data-name="header-title" className="text-2xl font-bold text-gray-800">
                        <i className="fas fa-shield-alt mr-2"></i>
                        Online Assessment Interface
                    </h1>
                    <p data-name="header-subtitle" className="text-sm text-gray-600 mt-1">
                        Secure Assessment Environment
                    </p>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
