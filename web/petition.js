(function(){
  var ref$, div, img, form, button, label, input, span, em, firebaseApp, PetitionApp, PetitionList, Petitioner, FBAuthButton, PetitionForm;
  ref$ = React.DOM, div = ref$.div, img = ref$.img, form = ref$.form, button = ref$.button, label = ref$.label, input = ref$.input, span = ref$.span, em = ref$.em;
  firebaseApp = 'https://petition.firebaseio.com/';
  PetitionApp = React.createClass({
    displayName: 'PetitionApp',
    mixins: [ReactFireMixin],
    getInitialState: function(){
      return {
        data: [],
        user: null,
        isPetitioned: false
      };
    },
    componentWillMount: function(){
      var this$ = this;
      this.bindAsArray(new Firebase(firebaseApp + "/issues/fireman-owyeu8i3t7l7rves/petitioners"), 'data');
      return this.auth = new FirebaseSimpleLogin(this.firebaseRefs['data'], function(error, user){
        var ref;
        if (error) {
          return console(error);
        }
        if (user) {
          this$.setState({
            user: user
          });
          ref = this$.firebaseRefs.data.startAt(user.uid).endAt(user.uid);
          return ref.on('child_added', function(it){
            if (it.val()) {
              return this$.setState({
                isPetitioned: true
              });
            }
          });
        } else {
          return this$.setState({
            user: null
          });
        }
      });
    },
    handlePetitionSubmit: function(petition){
      var uid, petitioners, newPeitionRef;
      uid = petition.uid;
      petitioners = this.state.data;
      petitioners.push(petition);
      this.setState({
        data: petitioners
      });
      newPeitionRef = this.firebaseRefs.data.push();
      return newPeitionRef.setWithPriority(petition, uid);
    },
    handleLogin: function(){
      return this.auth.login('facebook', {
        rememberMe: true,
        scope: 'email'
      });
    },
    handleLogout: function(){
      return this.auth.logout();
    },
    render: function(){
      return div({}, !this.state.user
        ? FBAuthButton({
          handleClick: this.handleLogin,
          message: '臉書登入'
        })
        : FBAuthButton({
          handleClick: this.handleLogout,
          message: '臉書登出'
        }), this.state.user && !this.state.isPetitioned ? PetitionForm({
        onPetitionSubmit: this.handlePetitionSubmit,
        uid: this.state.user.uid,
        displayName: this.state.user.displayName,
        email: this.state.user.thirdPartyUserData.email,
        avatarURL: this.state.user.thirdPartyUserData.picture.data.url
      }) : void 8, this.state.isPetitioned && this.state.user ? div({}, '我已連署過') : void 8, PetitionList({
        data: this.state.data
      }));
    }
  });
  PetitionList = React.createClass({
    displayName: 'PetitionList',
    render: function(){
      var count, personNodes;
      count = 0;
      personNodes = this.props.data.map(function(petitioner){
        var displayName, avatarURL, hiddenMe;
        displayName = petitioner.displayName, avatarURL = petitioner.avatarURL, hiddenMe = petitioner.hiddenMe;
        if (!hiddenMe) {
          count = count + 1;
          return Petitioner({
            author: displayName,
            avatar: avatarURL
          });
        }
      });
      return div({
        className: 'petition-list'
      }, div({
        className: 'issue-petitioners'
      }, "目前已經有 " + this.props.data.length + " 人連署"), {
        personNodes: personNodes
      }, this.props.data.length - count > 0 ? span({
        className: 'more'
      }, "...以及其他" + (this.props.data.length - count) + "人。") : void 8);
    }
  });
  Petitioner = React.createClass({
    displayName: 'PetitionPerson',
    render: function(){
      return div({
        className: 'petitioner'
      }, img({
        src: this.props.avatar
      }), div({
        className: 'name'
      }, this.props.author));
    }
  });
  FBAuthButton = React.createClass({
    displayName: 'FBAuthButton',
    render: function(){
      return button({
        onClick: this.props.handleClick
      }, this.props.message);
    }
  });
  PetitionForm = React.createClass({
    displayName: 'PetitionForm',
    getInitialState: function(){
      return {
        displayName: this.props.displayName || '',
        email: this.props.email || '',
        uid: this.props.uid || '',
        avatarURL: this.props.avatarURL || '',
        hiddenMe: false
      };
    },
    handleNameChange: function(it){
      return this.setState({
        displayName: it.target.value
      });
    },
    handleEmailChange: function(it){
      return this.setState({
        email: it.target.value
      });
    },
    handleDisplayCheck: function(it){
      return this.setState({
        hiddenMe: it.target.checked
      });
    },
    handleSubmit: function(it){
      var ref$, displayName, email, uid, avatarURL, hiddenMe;
      it.preventDefault();
      ref$ = this.state, displayName = ref$.displayName, email = ref$.email, uid = ref$.uid, avatarURL = ref$.avatarURL, hiddenMe = ref$.hiddenMe;
      console.log(hiddenMe);
      if (!(displayName || email || uid || avatarURL)) {
        return;
      }
      displayName = displayName.trim();
      return this.props.onPetitionSubmit({
        displayName: displayName,
        email: email,
        uid: uid,
        avatarURL: avatarURL,
        hiddenMe: hiddenMe
      });
    },
    render: function(){
      return form({
        onSubmit: this.handleSubmit
      }, label({}, '顯示名稱'), input({
        type: 'text',
        value: this.state.displayName,
        onChange: this.handleNameChange
      }), label({}, 'Email'), input({
        type: 'email',
        value: this.state.email,
        onChange: this.handleEmailChange
      }), input({
        type: 'checkbox',
        checked: this.state.hiddenMe,
        onChange: this.handleDisplayCheck
      }, '不要顯示'), input({
        type: 'hidden',
        value: this.state.uid
      }), input({
        type: 'hidden',
        value: this.state.avatarURL
      }), button({
        type: 'submit',
        onSubmit: this.handleSubmit
      }, '我要連署'));
    }
  });
  React.renderComponent(PetitionApp(), document.body);
}).call(this);
