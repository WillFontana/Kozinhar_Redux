import { connect } from "react-redux";
import ProfileInfo from "../components/ProfileInfo";

const mapStateToProps = state => ({
    friend: state.friend,
});

export default connect(mapStateToProps)(ProfileInfo);