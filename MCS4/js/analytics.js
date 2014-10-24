(function (g) {

	var productId = "5fa752ae121249ce9dfbb413aaadab1a"; // App unique product key

    
    function log(msg) {
		var height = 0;

        $console.append("<p style='color: white;'>" + msg + "</p>");
		$console.children().each(function () {
			height = height + $(this).outerHeight();
		});
		$console.scrollTop(height);
	}
    
	// Make analytics available via the window.analytics variable
	// Start analytics by calling window.analytics.Start()
	var analytics = g.analytics = g.analytics || {};
	analytics.Start = function () {
		// Handy shortcuts to the analytics api
		var factory = window.plugins.EqatecAnalytics.Factory;
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		// Create the monitor instance using the unique product key for Analytics
		var settings = factory.CreateSettings(productId);
        var $console;
        $console = $("#console"); //This only works if you have a div or other html element with the id console
		settings.LoggingInterface = factory.CreateTraceLogger();
		factory.CreateMonitorWithSettings(settings,
			function () {
				console.log("Monitor created");
                log("Monitor Created");
				// Start the monitor inside the success-callback
				monitor.Start(function () {
					console.log("Monitor started");
                    log("Monitor Started");
				});
			},
			function (msg) {
				console.log("Error creating monitor: " + msg);
                log("Error creating monitor: " + msg);
			}
		);
	};
	analytics.Stop = function () {
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		monitor.Stop();
	};
	analytics.Monitor = function () {
		return window.plugins.EqatecAnalytics.Monitor;
	};
})(window);