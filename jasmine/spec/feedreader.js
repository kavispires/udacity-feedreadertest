/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function hasUrl(element) {
            it('feed has URL', function() {
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe('');
            });    
        }

        // Loop through all feed entries and run function for each
        for(var i = 0; i < allFeeds.length; i++) {
            hasUrl(allFeeds[i]);
        }

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         function hasName(element) {
            it('feed has name', function() {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe('');
            });
         }

         // Loop through all feed entries and run function for each
         for(var i = 0; i < allFeeds.length; i++) {
            hasName(allFeeds[i]);
         }
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */ 
         var hiddenClass;

         // Check if body has class menu-hidden
         function checkClass() {
            hiddenClass = $('body').hasClass('menu-hidden'); 
         }

         it('is hidden', function() {
            checkClass();
            expect(hiddenClass).toBe(true);
         });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          // Triggers click event
          function triggerClick() {
            $('.menu-icon-link').trigger('click');
            checkClass();
          }

          it('toggles when hamburger button is clicked', function() {
            // Simulate menu click
            triggerClick();
            expect(hiddenClass).toBe(false);
            // Simulate menu click again
            triggerClick();
            expect(hiddenClass).toBe(true);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('returns successfully with at least one entry', function(done){
            var $entry = $('.feed .entry');
            expect($entry.length).toBeGreaterThan(0);
            done();
        });

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('News Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed1,
            feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = $('.feed').html();
            });
            loadFeed(1, done);
        });

        it('is returning a different feed in every load', function(done){
            feed2 = $('.feed').html();

            expect(feed1).toBeDefined();
            expect(feed2).toBeDefined();
            expect(feed1).not.toEqual(feed2);
            done();
        });

    });

    // TODO: Add extra test for future functionalities
    describe('First Entry', function() {

        // Triggers click event and returns true if has class 'favorite'
        function triggerClick() {
            $('.feed:first-child .heart').trigger('click');
            return $('.feed:first-child').hasClass('favorite'); 
        }

        it('is successfully being marked as favorite.', function() {
            expect(triggerClick()).toBe(true);
        });
    });
}());
