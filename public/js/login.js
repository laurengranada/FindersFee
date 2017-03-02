var AUTH0_CLIENT_ID = 'vhEttCE1CDX47iLcwqrD9QzktODnIRSm';
var AUTH0_DOMAIN = 'dflint1.auth0.com';
var AUTH0_CALLBACK_URL = location.href;

window.addEventListener('load', function() {
    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

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
        $('#login').style.display = "none";
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
            if (data.userType == "seeker") {
    //            
            }
        });
     };


    parseHash();

});

          
