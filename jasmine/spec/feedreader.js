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

        // Test loops through each feed in the allFeeds object and ensures...
        allFeeds.forEach(function(feed) {
            // ...it has a URL defined and that the URL is not empty.
            it('and feed has a URL', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
            // ...it has a name defined and that the name is not empty.
            it('and feed has a name', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }); 
        });

    });

    describe('The Menu', function() {
        var hiddenClass;

        // Check if body has class menu-hidden
        function checkClass() {
            hiddenClass = $('body').hasClass('menu-hidden'); 
        }

        // Ensure that the element is hidden by default
        it('is hidden', function() {
            checkClass();
            expect(hiddenClass).toBeTruthy();
        });

        // Trigger click event, and calls checkClass
        function triggerClick() {
            $('.menu-icon-link').trigger('click');
            checkClass();
        }

        // Ensure the menu changes visibility when the menu icon is clicked
        it('toggles when hamburger button is clicked', function() {
            // Simulate menu click
            triggerClick();
            expect(hiddenClass).toBeFalsy();
            // Simulate menu click again
            triggerClick();
            expect(hiddenClass).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('returns successfully with at least one entry', function(){
            var $entry = $('.feed .entry');
            expect($entry.length).toBeGreaterThan(0);
        });

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('News Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        
        var $feed1,
            $feed2;

        beforeEach(function(done) {
            loadFeed(1, function() {
                $feed1 = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('is returning a different feed in every load', function(done){
            $feed2 = $('.feed').html();
            expect($feed1).toBeDefined();
            expect($feed2).toBeDefined();
            expect($feed1).not.toEqual($feed2);
            done();
        });

    });

    // Add extra test for future functionalities
    describe('First Entry', function() {

        // Triggers click event and returns true if has class 'favorite'
        function triggerClick() {
            $('.feed:first-child .heart').trigger('click');
            return $('.feed:first-child').hasClass('favorite'); 
        }

        xit('is successfully being marked as favorite.', function() {
            expect(triggerClick()).toBe(true);
        });
    });
}());
