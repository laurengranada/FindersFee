var AUTH0_CLIENT_ID = 'vhEttCE1CDX47iLcwqrD9QzktODnIRSm';
var AUTH0_DOMAIN = 'dflint1.auth0.com';
var AUTH0_CALLBACK_URL = location.href;

window.addEventListener('load', function() {
    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
        theme: {
            logo: "../dollar.png"
        }
    });

    // var lock = new Auth0Lock('vhEttCE1CDX47iLcwqrD9QzktODnIRSm', 'dflint1.auth0.com');
    document.getElementById('btn-login').addEventListener('click', function() {
        lock.show();
    });

    document.getElementById('btn-logout').addEventListener('click', function() {
        logout();
    });

    lock.on("authenticated", function(authResult) {
        lock.getProfile(authResult.idToken, function(err, profile) {
            if (err) {
                // Remove expired token (if any)
                localStorage.removeItem('id_token');
                // Remove expired profile (if any)
                localStorage.removeItem('profile');
                return alert('There was an error getting the profile: ' + err.message);
            } else {
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));
                showUserProfile(profile);
            }
        });
    });

    var parseHash = function() {
        var id_token = localStorage.getItem('id_token');
        if (null != id_token) {
            var user_profile = JSON.parse(localStorage.getItem('profile'));
            showUserProfile(user_profile);
        } // else: not authorized
    };

    var showUserProfile = function(profile) {
        $('#login').style.display = "none";  //tried "" instead of none 7:35pm 3/5/17 and doesn't work either
        $('#logged').style.display = "inline-block";
        $('#avatar').src = profile.picture;
        $('#name').textContent = profile.name;
        $('#email').textContent = profile.email;
        $('#nickname').textContent = profile.nickname;
        $('#created_at').textContent = profile.created_at;
        $('#updated_at').textContent = profile.updated_at;
        $('#country').textContent = profile.country;

        var user_info = ({
                email: profile.email
            });
         $.post("/user", user_info).then((data) => {
            console.log(data);
            if (data.userType == "seeker") {        ///changed this 03/05/17 6:31pm
                window.location.href = "/seekerform";
                } else if (data.userType == "finder") {
                    //if they are a seeker and have completed form, direct them to documents portal
                    window.location.href = "/post";
                }
            // } else { //if user is a lawyer, directs them to list of surveys
            //     window.location.href = "/";}
            
        });
    };
      
    


    parseHash();  //this has to be here in order for Auth0 to pull up the auth0 login popup

});

          
