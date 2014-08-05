{ div, img, form, button, label, input, span } = React.DOM

firebaseApp = 'https://petition.firebaseio.com/'

PetitionApp = React.createClass do
  displayName: 'PetitionApp'
  mixins: [ReactFireMixin]
  getInitialState: -> { data: [], user: null}
  componentWillMount: ->
    @bindAsArray (new Firebase "#{firebaseApp}/issues/fireman-owyeu8i3t7l7rves/petitioners"), 'data'
    @auth = new FirebaseSimpleLogin @firebaseRefs['data'], (error, user) ~>
      return console error if error
      if user
        @setState user: user
        console.log user
      else
        @setState user: null

  handlePetitionSubmit: (petition) ->
    petitioners = @state.data
    petitioners.push petition
    @setState data: petitioners
    @firebaseRefs.data.push petition
  handleLogin: ->
    @auth.login 'facebook', do
      rememberMe: true
      scope: 'email'
  handleLogout: ->
    @auth.logout!
  render: ->
    div {},
      unless @state.user
        FBAuthButton handleClick: @handleLogin, message: '臉書登入'
      else
        FBAuthButton handleClick: @handleLogout, message: '臉書登出'
      if @state.user
        PetitionForm do
          onPetitionSubmit: @handlePetitionSubmit
          uid: @state.user.uid
          displayName: @state.user.displayName
          email: @state.user.thirdPartyUserData.email
          avatarURL: @state.user.thirdPartyUserData.picture.data.url
      PetitionList data: @state.data


PetitionList = React.createClass do
  displayName: 'PetitionList'
  render: ->
    personNodes = @props.data.map ({displayName, avatarURL}:petitioner) ->
      Petitioner author: displayName, avatar: avatarURL
    div {className: 'petition-list'},
      { personNodes }
      span {}, '還有xxxx人'

Petitioner = React.createClass do
  displayName: 'PetitionPerson'
  render: ->
    div {className: 'petitioner'},
      img { src: @props.avatar }
      div {className: 'name'}, this.props.author

FBAuthButton = React.createClass do
  displayName: 'FBAuthButton'
  render: ->
    return button {onClick: @props.handleClick}, @props.message

PetitionForm = React.createClass do
  displayName: 'PetitionForm'
  getInitialState: ->
    return do
      displayName: @props.displayName || ''
      email: @props.email || ''
      uid: @props.uid || ''
      avatarURL: @props.avatarURL || ''
  handleNameChange: ->
    @setState displayName: it.target.value
  handleEmailChange: ->
    @setState email: it.target.value
  handleSubmit: ->
    it.preventDefault!
    {displayName, email, uid, avatarURL} = @state
    return unless displayName or email or uid or avatarURL
    displayName .= trim!
    @props.onPetitionSubmit do
      displayName: displayName
      email: email
      uid: uid
      avatarURL: avatarURL
  render: ->
    form { onSubmit: @handleSubmit },
      label {}, '顯示名稱'
      input {type: 'text', value: @state.displayName, onChange: @handleNameChange }
      label {}, 'Email'
      input {type: 'email', value: @state.email, onChange: @handleEmailChange }
      input {type: 'checkbox'}, '不要顯示'
      input {type: 'hidden', value: @state.uid }
      input {type: 'hidden', value: @state.avatarURL }
      button { type: 'submit', onSubmit: @handleSubmit }, '我要連署'


React.renderComponent PetitionApp!, document.body