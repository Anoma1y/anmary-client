import {
  SET_TAGS,
  APPEND_TAG,
  REMOVE_TAG,
  CHANGE_CURRENT_TAG,
  SET_IS_LOADING_TAG,
  SET_OPERATION,
  SET_OPERATION_TYPE,
  SET_FILTER_TAG,
  SET_IS_LOADING,
  SET_FILES,
  APPEND_FILE,
  REMOVE_FILE,
  RESET,
} from './types';
import { replace } from 'react-router-redux';
import { send } from 'containers/Notification/store/actions';
import { api } from 'lib/api';
import {
  amountInput,
  amountOutput
} from 'lib/amount';
import uuid from 'uuid/v1';
import _ from 'lodash';

export const setTags = (value) => ({
  type: SET_TAGS,
  payload: value,
});

export const appendTag = (value) => ({
  type: APPEND_TAG,
  payload: value,
});

export const removeTag = (value) => ({
  type: REMOVE_TAG,
  payload: value,
});

export const setOperation = (value) => ({
  type: SET_OPERATION,
  payload: value,
});

export const changeCurrentTag = (value) => ({
  type: CHANGE_CURRENT_TAG,
  payload: value,
});

export const setFilterTag = (value) => ({
  type: SET_FILTER_TAG,
  payload: value,
});

export const setFiles = (value) => ({
  type: SET_FILES,
  payload: value,
});

export const appendFile = (value) => ({
  type: APPEND_FILE,
  payload: value,
});

export const removeFile = (value) => ({
  type: REMOVE_FILE,
  payload: value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  payload: value,
});

export const setIsLoadingTag = (value) => ({
  type: SET_IS_LOADING_TAG,
  payload: value,
});

export const setOperationType = (value) => ({
  type: SET_OPERATION_TYPE,
  payload: value,
});

export const resetFormOperation = () => ({ type: RESET });

export const pullOperation = (operation_id) => (dispatch) => new Promise((resolve, reject) => {
  api.operations.getSingle(operation_id)
    .then((data) => {
      if (data.status !== api.code.OK) reject();

      const operation = {
        id: data.data.id,
        type: data.data.type,
        comments: data.data.comments,
        category: data.data.category.id,
        currency: data.data.currency.id,
        sum: String(amountOutput(data.data.sum).value),
      };

      dispatch(setOperationType(data.data.type));
      dispatch(setFiles(data.data.files));
      dispatch(setTags(data.data.tags));
      dispatch(setOperation(operation));
      resolve();
    })
    .catch(() => reject());
});

export const pullTags = () => (dispatch, getState) => {
  const { tagName } = getState().Operations_Form;

  if (tagName.length <= 0) return;

  dispatch(setIsLoadingTag(true));
  api.tags.get(tagName.toLowerCase(), 5)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(setFilterTag(data.data));
    })
    .finally(() => dispatch(setIsLoadingTag(false)));
};

export const addNewTag = () => (dispatch, getState) => {
  const { tagName, tags } = getState().Operations_Form;

  if (tagName.length <= 0) return;

  dispatch(setIsLoadingTag(true));
  api.tags.add(tagName)
    .then((data) => {
      if (data.status !== api.code.CREATED) return  ;

      const newTags = _.uniqBy([...tags, data.data], 'id');

      dispatch(setTags(newTags));
    })
    .finally(() => dispatch(setIsLoadingTag(false)));
};

export const uploadFile = (formData) => (dispatch) => {

  dispatch(setIsLoading(true));
  api.files.add(formData)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(appendFile(data.data));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка загрузки файла', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

//                       o
//                    ooo$
//                 oo$$$$$                 $$
//                $$$$$$$$oo             o$$$
//            oo$$$$$$$$$$$$$$$$ooo    o$$$$$                               oooo
//         o$$$$$$$$$$$$$$$$$$$$$$$$$o$$$$"$$                           o$$$$$$$
//      o$$$$$$$$$o$$$$$$$$$$$$$$$$$$$$$$$ $$o                       o$$$$$$$$$$
//      o$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" $$$                      o$$$$$$$$$$
//   o$$$$$$$$$$$$$o"""$$$$$$$$$$$$$$$$$$  $$$                    o$$$$$$$$$"
//   $$$$$$$$$$$$$$$$$$o  o$$$$$$$$$$$$$$  "$$$                  $$$$$$$$"
//  $$"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  $$$                 o$$$$$$"
//   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$oo$$o                 $$$$$$$
//   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                 $$$$$$"
//   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                 $$$$$$
//   "$$$$$$$$$o$$$$$$$$$$$$$$$$oo$$$$$$$$$$$$"                 $$$$$$
//    "$$$$$$$$$"$ $$$$$$$$$$$o$$"$$$$$$$$$$$$                  $$$$$$
//      "$$$$$$"   $ $  """   $"$$  $"$""$$$$$                  $$$$$$o
//        """"$$o  $$$        $o$$  "$$$o$$$$    oo             "$$$$$$
//            "o$ "$$" oo     $$$$   $$o$$$$ o$$$$$$$$ooo        $$$$$$o
//              $      oo     """  o$$$$$$$$$$$$$""""$$$$$        $$$$$$$o
//          ooo "$o    $$o      o$$$$$$$$$$$$$""    $$$$$$         "$$$$$$$
//       o$$$$$$$$$$oo "" oooo$""$$$$$$$$$$""      $$$$$$$          "$$$$$$$o
//     o$$$$$$$$$$$$o$""$$"       $$$o            """$$"""            $$$$$$$
//    o$$$$$$$$$$$$$$$ $$$      o$$" ""$o                              $$$$$$$
//    $$$$$$$$$$$$$$$$ $$$"$$$$"""       "$                             $$$$$$
//   $$$$$$$$$$$$$$$$" "$$$$"              $                            $$$$$$
//   $$$$$$$$"$"   $               o$$$$$o  $                          $$$$$$$
//  $$$$$$$$$$"  o$$oo   o""  oooo$$$$$$$$$o$                         $$$$$$$$
// o$$$$$$$$$"  o$$$$$$oo$o$$$$$$$$$$$$$$$$$$  oooooooooooo       ooo$$$$$$$$
// $$$$$$$$$$o  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"""$$$$ooo$$$$$$$$$$$$"
// $$$$$$$$$$$  $$$$$$$$$$$$$$$$""$$$$$$$$$$$$$$$$"        """$$$$$$$$$$""
// $$$$$$$$$$$  "$$$$$$$$$$$$$$     "$$$$$$$$$$$$              "$$$""""
// $$$$$$$$$$$  o$""$$$$$$$$$$        $$$$$$$$$$$                "o
//  $$$$$$$" "o$"       "$$$$        o$$$$$$$$$$$                 "o
//  "o"""""  $"           $$        $$$$$$$$$$$$$$$                $
//   "o   oo$"            $       o$$$$$$$$$$$$$$$$                $
//     """"              $       $$$$$$$$$$$$$$$$$$                $            o
//                      o"      $""$$$$$$$$$$$$$$$ooooooo         $"     ooo$$$$$
//                     o"      o"         $     o$$$$$$$$$$$ooo   $   oo$$oo$oooo

export const addOperation = () => (dispatch, getState) => {
  const {
    form: {
      Operations_Form: {
        values,
        syncError
      }
    },
    Operations_Form: {
      tags,
      files
    }
  } = getState();

  if (syncError || !values || !values.type || !values.category || !values.currency) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }

  const operationTags = tags.length !== 0 ? tags.map((tag) => tag.id) : [];
  const operationFiles = files.length !== 0 ? files.map((file) => file.id) : [];

  const operation = {
    ...values,
    sum: amountInput(values.sum.replace(/,/g, '')),
    tags: operationTags,
    files: operationFiles
  };

  dispatch(setIsLoading(true));
  api.operations.add(operation)
    .then((data) => {
      if (data.status !== api.code.CREATED) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: 'Операция была успешно добавлена', timeout: 2500 }));
      dispatch(replace('/dashboard/operations/'));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка добавления новой операции', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};

export const editOperation = () => (dispatch, getState) => {
  const {
    form: {
      Operations_Form: {
        values,
        syncError
      }
    },
    Operations_Form: {
      tags,
      files,
      operation: editOperation
    }
  } = getState();

  if (syncError || !values || !values.type || !values.category || !values.currency) {
    dispatch(send({ id: uuid(), status: 'warning', title: 'Предупреждение', message: 'Заполните все необходимые поля формы', timeout: 2500 }));
    return;
  }

  const operationTags = tags.length !== 0 ? tags.map((tag) => tag.id) : [];
  const operationFiles = files.length !== 0 ? files.map((file) => file.id) : [];

  const operation = {
    ...values,
    sum: amountInput(values.sum.replace(/,/g, '')),
    tags: operationTags,
    files: operationFiles
  };

  dispatch(setIsLoading(true));
  api.operations.edit(editOperation.id, operation)
    .then((data) => {
      if (data.status !== api.code.OK) return;

      dispatch(send({ id: uuid(), status: 'success', title: 'Успешно', message: `Операция ${editOperation.id} была успешно изменена`, timeout: 2500 }));
      dispatch(replace(`/dashboard/operations/${editOperation.id}`));
    })
    .catch(() => dispatch(send({ id: uuid(), status: 'error', title: 'Ошибка', message: 'Ошибка изменения операции', timeout: 2500 })))
    .finally(() => dispatch(setIsLoading(false)));
};
