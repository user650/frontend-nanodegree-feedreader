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
    /** RSS Feeds test 
    * 
    * This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    *
   */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         *
         * Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?  Answer: it returns the message epeected 0 not to be 0
         */

        it('RSS feed array is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        allFeeds.forEach(function(feed) {
            it('The url for this feed exists', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
            it('The name for this feed exists', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /** "The menu" test suite 
     * 
     * Tests out the Menu option in the upper left of the screen
     * this will check to see that the menu is hidden / not hidden based on default 
     * and clicking of the menu hamburger. 
     * 
    */
    describe('The Menu', function() {
        /** This test ensures the menu element is hidden initalilly   */
        it('Menu element is hidden by default', function() {
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

        /* This test will ensure that the menu changes
         * visibility when the menu icon is clicked. 
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
        */

        /** if menu is hidden before click then click it and then it should be shown**/
        var menuHamburger = $('.menu-icon-link');
        it('Menu element is displayed when it is clicked', function() {
            menuHamburger.click();  
            expect(document.body.classList.contains('menu-hidden')).toBeFalsy();
        });

        /** if menu is not hidden before click **/
        it('Menu element is hidden when it is clicked again.', function() {
            menuHamburger.click();  
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    /** Initial Entries test suite
     * 
     * This test ensures when the loadFeed function is called 
     * and completes its work, there is at least a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    describe('Initial Entries', function() {
        /** before each test we will kick off loadFeed functional */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('Feed container should be populated after loadFeed is done', function() {
            var feeds = $('.feed .entry');
            expect(feeds.length).toBeGreaterThan(0);
        });
    });

    /** New Feed Test Suite
     * 
     * This test that ensures when a new feed is loaded by the loadFeed function 
     * that the content actually changes.
     * 
    */
    describe('New Feed', function() {
        var feed0, feed1;
        beforeEach(function(done) {
            loadFeed(1, function() {
                feed1 = $('.feed').children().text();
                done();
            });
        });
        it('after new feed loads the content changes', function(done) {
            loadFeed(0, function() {
                feed0 = $('.feed').children().text();
                expect(feed0).not.toEqual(feed1);
                done();
            });
        });
    });
}());
