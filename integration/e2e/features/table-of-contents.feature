@Toc
@android @iphone @desktop
Feature: Displaying Table of Contents
  In order to easily navigate in a lengthy publication
  As a user
  I want a table of contents

  Background:
    Given the viewer is opened with a publication which include a table of contents

  Scenario: Display Table of Contents
    Given the viewer is in dashboard view
      And the viewer is in table of contents view
    Then table of contents are displayed to the user

  Scenario: Selecting table of contents item
    Given the viewer is in dashboard view
      And the viewer is in table of contents view
      And the user selects "Tittelside"
    Then the viewer should go to page 3
