!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.applicationForm=n({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="form-group">\n  <label for="company-name">Company Name</label>\n  <input name="company-name" class="form-control" id="company-name" placeholder="Enter Company Name">\n</div>\n<div class="form-group">\n  <label for="job-title">Job Title</label>\n  <input name="job-title" class="form-control" id="job-title" placeholder="Enter Job Title">\n</div>\n<div class="form-group">\n  <label for="status">Status</label>\n  <select name="status" class="form-control" id="status">\n    <option value="applied">Applied</option>\n    <option value="phone-screen-scheduled">Phone Screen Scheduled</option>\n  </select>\n</div>\n<div class="form-group">\n  <label for="notes">Notes</label>\n  <textarea name="notes" rows="10" class="form-control" id="notes"></textarea>\n</div>\n<input type="submit" class="btn btn-default">\n'},useData:!0}),a.applicationFormContainer=n({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="col-md-12">\n  <form id="application-form-container"></form>\n</div>\n'},useData:!0}),a.applicationsTable=n({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h1>Your Applications</h1>\n\n<table class="table table-striped applications-table">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Status</th>\n      <th>Actions</th>\n    </tr>\n  </thead>\n  <tbody class="applications-container">\n  </tbody>\n</table>\n'},useData:!0}),a.loginForm=n({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="col-md-12">\n  <h2>Log In</h2>\n  <form id="signup-form-container">\n    <div class="form-group">\n      <label for="username">Username</label>\n      <input name="username" class="form-control" id="username" placeholder="Enter Username">\n    </div>\n    <div class="form-group">\n      <label for="password">Password</label>\n      <input name="password" class="form-control" id="password" placeholder="Enter Password">\n    </div>\n    <input type="submit" class="btn btn-default">\n  </form>\n  <div class="links">\n    <a href="./#login">Login</a>\n    <a href="./#signup">Signup</a>\n  </div>\n</div>\n'},useData:!0}),a.signupForm=n({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="col-md-12">\n  <h2>Sign Up</h2>\n  <form id="signup-form-container">\n    <div class="form-group">\n      <label for="username">Username</label>\n      <input name="username" class="form-control" id="username" placeholder="Enter Username">\n    </div>\n    <div class="form-group">\n      <label for="password">Password</label>\n      <input name="password" class="form-control" id="password" placeholder="Enter Password">\n    </div>\n    <input type="submit" class="btn btn-default">\n  </form>\n  <div class="links">\n    <a href="./#login">Login</a>\n    <a href="./#signup">Signup</a>\n  </div>\n</div>\n'},useData:!0})}();
