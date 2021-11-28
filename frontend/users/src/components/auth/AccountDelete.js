import axios from "axios";
import { useForm } from "react-hook-form";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from '../../hooks/useSafeState';
import useUnmountRef from '../../hooks/useUnmountRef';
import './auth.scss';
