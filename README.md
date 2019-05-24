# Fleet Backend Code Challenge

Our codebase is mainly made up of two repos, one for Rails and one for Vue. The Rails side primarily exposes an API consumed by the Vue app. This code challenge is intended to reflect that. We'd like you to build a Rails application with a few key components to demonstrate proficiency in many common Ruby and Rails patterns, which you'll find yourself using day-to-day here.

Though each engineer does specialize in either front-end or back-end, we still sometimes have full-stack responsibilities. So we'd also like you to implement some basic functionality in either the given Vue or React app.

We expect this exercise to take 2-4 hours at the most. Since this is a backend-focused challenge, we are not looking for styling or CSS work. And, don't concern yourself with configuring everything perfectly. This is just an exercise, so if you don't need to tweak something in order to meet the criteria below, leave it at defaults.

At Fleet, we work with money in most world currencies across our data model. For reporting purposes, we need to be able to work with all money amounts in a common currency of US dollars, in addition to the original currency it was stored with. For example, it should be easy to get a sum of all amounts in USD.

Although we'll leave it to you to otherwise decide which gems to bring in, we will recommend money-rails. And for this exercise, you'll need to add some currency conversion data. For the purposes of this exercise, assume USD -> EUR is 0.84663, and EUR -> USD is 1.18115. Don’t worry about any other currencies.

# Back-end Portion

Please create a Rails app that stores and looks up rates from shipping service providers. The app should have these properties:

* A model to represent a shipping service provider. It should have these attributes:
  * Name of company
  * A flat shipping rate as a monetary value with currency

* A model to represent a shipping rate, different from the flat rate. It should have these attributes:
  * Rate as monetary value with currency (per kilo)
  * Origin, as two-letter country code
  * Destination, as two-letter country code

* Means of loading the attached data into a data store. We are not looking for a UI for this, console is fine.
* The converted monetary USD amounts all should be stored, in case we'd want to query them.
* Form that allows editing and updating a rate, accessible from the main list. Again, bare-bones, do not worry about making it pretty.  Allow changing all attributes except the common USD rate.
* Implement a reusable way to ensure that whenever a configurable money column is assigned, that same amount is also set as the other amount, but converted to USD. It should be easy to include this functionality into any other model that works with currency. Bring this functionality into both the shipping rate model and the shipping service provider model. This is an example of how it should behave:

  ```ruby
  some_model = SomeModel.new

  some_model.amount = 15.0
  some_model.currency = "EUR"
  some_model.save!

  some_model.amount # => 15.00 EUR
  some_model.common_amount # => 17.72 USD

  some_model.amount = 30.0
  some_model.currency = "EUR"
  some_model.save!

  some_model.amount # => 30.0 EUR
  some_model.common_amount # => 35.43 USD
  ```

# Front-end Portion

We have created a bare-bones Vue and React app in directories `vue-spa` and `react-spa`. Please choose **either** and create a simple index view consisting of a list of all rates showing provider's name, origin, destination, nicely formatted rate as a monetary value, and nicely formatted common rate in USD.

Since this is a back-end challenge, we aren't looking for anything more complex than fetching this data from the Rails app on page load.

That said, bonus points for adding an extra filter: Above this list, implement a form that allows picking an origin & destination. Submitting this filters the list of rates by the selected origin and destination.  For instance, if I picked US and CN, I should only see rates with an origin of US and a destination of CN.

To start the Vue app:

```
cd vue-spa
npm i
npm run serve
```

To start the React app:

```
cd react-spa
npm i
npm run start
```

We encourage you to demonstrate your workflow via Git commits with good messages.

We do not expect you to write tests for this in the interest of time.

When you are done, please either zip up your repo and email it to engineering@tryfleet.com or push it up to Github. If you need to clarify anything regarding this challenge, feel free to email us.
