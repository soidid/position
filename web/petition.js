(function(){
  var ref$, div, img, form, button, label, input, span, firebaseApp, PetitionApp, PetitionList, Petitioner, FBAuthButton, PetitionForm;
  ref$ = React.DOM, div = ref$.div, img = ref$.img, form = ref$.form, button = ref$.button, label = ref$.label, input = ref$.input, span = ref$.span;
  firebaseApp = 'https://petition.firebaseio.com/';
  PetitionApp = React.createClass({
    displayName: 'PetitionApp',
    mixins: [ReactFireMixin],
    getInitialState: function(){
      return {
        data: [],
        user: null
      };
    },
    componentWillMount: function(){
      var this$ = this;
      this.bindAsArray(new Firebase(firebaseApp + "/issues/fireman-owyeu8i3t7l7rves/petitioners"), 'data');
      return this.auth = new FirebaseSimpleLogin(this.firebaseRefs['data'], function(error, user){
        if (error) {
          return console(error);
        }
        if (user) {
          this$.setState({
            user: user
          });
          return console.log(user);
        } else {
          return this$.setState({
            user: null
          });
        }
      });
    },
    handlePetitionSubmit: function(petition){
      var petitioners;
      petitioners = this.state.data;
      petitioners.push(petition);
      this.setState({
        data: petitioners
      });
      return this.firebaseRefs.data.push(petition);
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
        }), this.state.user ? PetitionForm({
        onPetitionSubmit: this.handlePetitionSubmit,
        uid: this.state.user.uid,
        displayName: this.state.user.displayName,
        email: this.state.user.thirdPartyUserData.email,
        avatarURL: this.state.user.thirdPartyUserData.picture.data.url
      }) : void 8, PetitionList({
        data: this.state.data
      }));
    }
  });
  PetitionList = React.createClass({
    displayName: 'PetitionList',
    render: function(){
      var personNodes;
      personNodes = this.props.data.map(function(petitioner){
        var displayName, avatarURL;
        displayName = petitioner.displayName, avatarURL = petitioner.avatarURL;
        return Petitioner({
          author: displayName,
          avatar: avatarURL
        });
      });
      return div({
        className: 'petition-list'
      }, {
        personNodes: personNodes
      }, span({}, '還有xxxx人'));
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
        avatarURL: this.props.avatarURL || ''
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
    handleSubmit: function(it){
      var ref$, displayName, email, uid, avatarURL;
      it.preventDefault();
      ref$ = this.state, displayName = ref$.displayName, email = ref$.email, uid = ref$.uid, avatarURL = ref$.avatarURL;
      if (!(displayName || email || uid || avatarURL)) {
        return;
      }
      displayName = displayName.trim();
      return this.props.onPetitionSubmit({
        displayName: displayName,
        email: email,
        uid: uid,
        avatarURL: avatarURL
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
        type: 'checkbox'
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
