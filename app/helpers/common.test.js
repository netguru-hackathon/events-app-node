import { handleError } from './common';

describe('handleError', () => {
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  };

  it('calls res.json with serialized error', () => {
    handleError(res, 404, 'error title', 'error details', 'error source');

    expect(res.json).toBeCalledWith({
      errors: [
        {
          code: 404,
          detail: 'error details',
          source: {},
          title: 'error title',
        },
      ],
    });
  });

  it('sets passed error status', () => {
    handleError(res, 402);

    expect(res.status).toBeCalledWith(402);
  });
});
