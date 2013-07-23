author: Christian Sterzl
time: 2009
name: Reservoirs
tags: python django mysql
summary: A web application written for the Swiss Federal Office of Energy SFOE. It enables operators of reservoirs to self report statistical data about. Furthermore the application outputs reports of this data in different formats such as PDF or Excel.

<div class="swiper-container" cc-slider>
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="/assets/projects/reservoirs/welcome.png">
    </div>
    <div class="swiper-slide">
      <img src="/assets/projects/reservoirs/reports.png">
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>

# Reervoirs Application

Reservoirs is a web application written for the Swiss Federal Office of Energy SFOE. 

The application originated out of the need to create a central place where operators of reservoirs could report their weekly statistic data and automating the process creating weekly reports. Until then, operators reported the data using either fax or email. Employees of the SFOE then tracked this data in an excel worksheet and created reports.

This small application fulfils all these requirements. It is written in python utilizing the web framework [django](https://www.djangoproject.com). Django was chosen because it provides an admin interface out of the box, a unique feature at this time, which minimized development time to just a few weeks.

Furthermore, reservoirs is held in the style of the swiss federation and supports multiple languages. 
