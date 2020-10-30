import { connect } from "react-redux";
import ProfilesList from "../components/ProfilesList";

const mapStateToProps = state => ({
    friend: state.friend,
});

export default connect(mapStateToProps)(ProfilesList);